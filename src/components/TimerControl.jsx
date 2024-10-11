import PropTypes from 'prop-types';

const TimerControl = ({ interval, setInterval }) => {
  return (
    <div>
      <label>Update Interval (seconds): </label>
      <input
        type="number"
        value={interval}
        onChange={(e) => setInterval(Number(e.target.value))}
      />
    </div>
  );
};

TimerControl.propTypes = {
  interval: PropTypes.number.isRequired,
  setInterval: PropTypes.func.isRequired,
};

export default TimerControl;
