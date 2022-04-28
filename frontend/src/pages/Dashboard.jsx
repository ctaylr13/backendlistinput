import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";
import { getGoals, reset } from "../features/goals/goalSlice";

const Dashboard = () => {
    const [maxNumberOfPriorities, setMaxNumberOfPriorities] = useState(4);
    const [viewSettings, setViewSettings] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { goals, isLoading, isError, message } = useSelector(
        (state) => state.goals
    );

    const onSettings = () => {
        setViewSettings(!viewSettings);
    };
    console.log("view settings", viewSettings);
    useEffect(() => {
        if (isError) {
            console.log(message);
        }

        if (!user) {
            navigate("/login");
        }

        dispatch(getGoals());

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Top {maxNumberOfPriorities} Priorities</p>
            </section>

            <section>
                <GoalForm
                    label="Enter a priority:"
                    placeholder="Type task..."
                    disabled={goals.length > maxNumberOfPriorities}
                />
            </section>

            <section className="content">
                {goals.length > 0 ? (
                    <div className="items">
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any goals</h3>
                )}
            </section>
            <section className="content">
                {viewSettings ? (
                    <button className="btn" onClick={onSettings}>
                        <FaCog /> Hide Settings
                    </button>
                ) : (
                    <button className="btn" onClick={onSettings}>
                        <FaCog /> View Settings
                    </button>
                )}
            </section>
            {viewSettings && (
                <section className="content">
                    <div>Set max # of priorites: </div>
                    <input
                        type="number"
                        value={maxNumberOfPriorities ?? ""}
                        onChange={(e) =>
                            setMaxNumberOfPriorities(e.target.value)
                        }
                    />
                </section>
            )}
        </>
    );
};

export default Dashboard;
