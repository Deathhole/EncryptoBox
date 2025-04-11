import React from "react";
import zxcvbn from "zxcvbn";

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const strength = zxcvbn(password).score;
  const strengthLabels = ["Very Weak 😞", "Weak 😕", "Medium 🙂", "Strong 😃", "Very Strong 💪"];
  const strengthColors = ["#ff4d4d", "#ff944d", "#ffdb4d", "#70db70", "#009933"];

  return (
    <div className="password-strength-container">
      <div className="strength-bar">
        <div className="strength-fill" style={{ width: `${(strength + 1) * 20}%`, backgroundColor: strengthColors[strength] }}></div>
      </div>
      <p style={{ color: strengthColors[strength] }}>{strengthLabels[strength]}</p>
    </div>
  );
};

export default PasswordStrengthMeter;
