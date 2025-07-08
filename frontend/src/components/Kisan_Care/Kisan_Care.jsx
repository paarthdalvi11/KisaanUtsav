import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import './Kisan_Care.css'; // Changed CSS file name to match convention
// import translate from '../Translation'

const makeRequestAPI = async (prompt) => {
    const res = await axios.post("http://localhost:3500/generate", { prompt });
    return res.data;
};

const formatResponse = (response) => {
    const paragraphs = response.split("\n\n");
    
    return paragraphs.map((paragraph, index) => {
        const lines = paragraph.split("**");
        return (
            <div key={index}>
            {lines.map((line, idx) => {
                if (idx % 2 === 0) {
                return (
                    <p key={idx} className="weather-normal"> 
                        {line}
                    </p>
                );
                } else {
                const numberedLines = line.split(/\*\*(\d+)\. /).filter(Boolean);
                return (
                    <ol key={idx} className="weather-numbered list-type"> 
                        {numberedLines.map((numberedLine, index) => (
                            <li key={index}>{numberedLine}</li>
                        ))}
                    </ol>
                );
                }
            })}
            </div>
        );
    });
};

function KisanCare() { // Changed function name to camelCase
    const [prompt, setPrompt] = useState("");
    const [isPromptEmpty, setIsPromptEmpty] = useState(true);
    //!mutation
    const mutation = useMutation({
        mutationFn: makeRequestAPI,
        mutationKey: ["gemini-ai-request"],
    });

    //!submit handler
    const submitHandler = (e) => {
        e.preventDefault();
        if (!isPromptEmpty) {
            mutation.mutate(prompt);
        }
    };

    //!handle prompt change
    const handlePromptChange = (e) => {
        const inputValue = e.target.value;
        setPrompt(inputValue);
        setIsPromptEmpty(inputValue.trim().length === 0);
    };

    console.log(mutation);
    return (
        <div className="kisan-care"> 
            <div className='aititle'>

                <h1>Ask our AI</h1>
            </div>
            
            <form className="kisan-care-form" onSubmit={submitHandler}> 
                <p>Enter your problem and let AI craft a unique solution.</p>
                <label htmlFor="Enter your prompt:"></label>
                <input
                    type="text"
                    value={prompt}
                    onChange={handlePromptChange}
                    placeholder="Write your problem here..."
                    className="kisan-care-input" 
                />
                <button
                    className={`kisan-care-button ${isPromptEmpty ? 'disabled' : ''}`}
                    type="submit"
                    disabled={isPromptEmpty}
                >
                    Generate Solution
                </button>
            </form>
            <section className="kisan-care-response"> 
                {mutation.isPending && <p>Generating solution for your problem...</p>}
                {mutation.isError && <p>Cannot fulfill your request for this time</p>}
                {mutation.isSuccess && formatResponse(mutation.data)}
                {/* {mutation.isSuccess && formatResponse(translate(mutation.data))} */}
            </section>            
        </div>  
    );
}

export default KisanCare; // Changed export name to camelCase
