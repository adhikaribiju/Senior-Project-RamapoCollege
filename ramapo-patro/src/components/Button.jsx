

/*
Button()
NAME
    Button
SYNOPSIS
    Button();
DESCRIPTION
    This React component renders a button with customizable text and click functionality. 
    When the button is clicked, it triggers a specified action via an event handler. 
    The button's appearance changes when hovered, applying a background color change and text color shift.
    It is styled with padding, borders, and hover effects to enhance the user interaction experience.

RETURNS
    Returns a React button component with hover effects and click functionality.
*/



const Button = ({ onClickHandler, value, title }) => {
  return (
    <button
      onClick={onClickHandler}
      value={value}
      className={`px-4 py-1 border text-base hover:bg-blue hover:text-white`}
    >
      {title}
    </button>
  );
};

export default Button;
