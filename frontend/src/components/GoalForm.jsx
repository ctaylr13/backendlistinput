import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createGoal } from "../features/goals/goalSlice";

const GoalForm = ({ label, placeholder, disabled }) => {
    const [text, setText] = useState("");
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(createGoal({ text }));
        } else {
            toast.warning("Please input text to submit");
        }

        setText("");
    };

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="text">{label}</label>
                    <input
                        type="text"
                        name="text"
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={placeholder}
                    />
                </div>
                <div className="form-group">
                    {!disabled ? (
                        <button className="btn btn-block" type="submit">
                            Add Goal
                        </button>
                    ) : (
                        <button
                            className="btn-disabled btn-block"
                            disabled={true}
                        >
                            Remove goals to continue to add
                        </button>
                    )}
                </div>
            </form>
        </section>
    );
};

export default GoalForm;
