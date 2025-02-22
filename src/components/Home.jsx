import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "../css/home.css";

export const Home = () => {
  const [topic, setTopic] = useState("");
  const [teamName, setTeamName] = useState("");
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
 
  const [showRules, setShowRules] = useState(false);

  const handleSubmit = () => {
    if (teamName.trim() === "") {
      setError("Team name cannot be empty!");
      return;
    }

    const isDuplicate = entries.some((entry) => entry.teamName === teamName);
    if (isDuplicate) {
      setError("Team name already exists. Please choose a different name.");
      return;
    }
    setError("");

    const topicsList = [
      "Design a Food Delivery App UI",
      "Create a Travel Booking Website Layout",
      "Build a Subscription Pricing Page",
      "Design a Simple Contact Form",
      "Create a Mobile Wallet App Interface",
      "Prototype a Basic Chat Application",
      "Design a Fitness Tracker Dashboard",
      "Create a Movie Streaming App UI",
      "Build a Minimalist Resume/CV Template",
      "Design a Simple Event Registration Page",
    ];

    const randomTopic =
      topicsList[Math.floor(Math.random() * topicsList.length)];
    setTopic(randomTopic);

    setEntries([...entries, { teamName, topic: randomTopic }]);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(entries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Event Entries");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "Event_Entries.xlsx");
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (entries.length > 0) {
        exportToExcel();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [entries]);

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  const toggleInstruction = () => {
    setShowInstruction(!showInstruction);
  };

  return (
    <div className="main-app">
      <div className="main">
        <div className="Top">
          <h1>PIXEL PERFECT</h1>
        </div>
        <div className="text-container">
          <h2>CHOOSE YOUR TOPIC FOR THE EVENT</h2>
          <div className="input-container">
            <input
              type="text"
              placeholder="ENTER YOUR PLAYER ALLIANCE"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
          {error && <p className="error-message">{error}</p>}
          {topic && (
            <div className="topic-container">
              <h3>Your Topic:</h3>
              <p>{topic}</p>
            </div>
          )}
        </div>
        <div className="buttons">
          
          <div className="rules">
            <button onClick={toggleRules}>Rules</button>
          </div>
        </div>
        
        {showRules && (
          <div
            className="rules"
            style={{
              display: "flex",
              flexWrap: "wrap",
              width: "500px",
            }}
          >
            <h3>
              Event Rules – PIXEL PERFECT <span>FIGMA</span>
            </h3>
            <p>
              <span style={{ color: "#fff" }}>1)</span>Do not copy templates – All designs must be original. Using pre-made templates will result in disqualification.
            </p>
            <p>
              <span style={{ color: "#fff" }}>2)</span>Design within given dimensions – Follow the specified canvas size and layout guidelines provided for the challenge.
            </p>
            <p>
              <span style={{ color: "#fff" }}>3)</span>Use proper typography – Maintain readability and consistency in font selection, hierarchy, and spacing.
            </p>
            <p>
              <span style={{ color: "#fff" }}>4)</span>Ensure color scheme is visually appealing – Use harmonious colors that enhance user experience and accessibility.
            </p>
            <p>
              <span style={{ color: "#fff" }}>5)</span>Design must be responsive – Ensure adaptability across different screen sizes (desktop, tablet, and mobile).
            </p>
            <p>
              <span style={{ color: "#fff" }}>6)</span>Follow UI/UX best practices – Designs should be user-friendly, intuitive, and visually engaging.
            </p>
            <p>
              <span style={{ color: "#fff" }}>7)</span>No offensive or inappropriate content – Designs must adhere to ethical and professional standards.
            </p>
            <p>
              <span style={{ color: "#fff" }}>8)</span>Submit work before the deadline – Late submissions will not be accepted.
            </p>
            <p>
              <span style={{ color: "#fff" }}>9)</span>Collaboration tools allowed – Teams can collaborate using Figma’s built-in features but must work within event guidelines.
            </p>
            <p>
              <span style={{ color: "#fff" }}>10)</span>Judges’ decision is final – Entries will be evaluated based on creativity, usability, aesthetics, and presentation.
            </p>
          </div>
        )}
      </div>

      {entries.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Topic</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.teamName}</td>
                  <td>{entry.topic}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={exportToExcel}>Download as Excel</button>
        </>
      )}
    </div>
  );
};
