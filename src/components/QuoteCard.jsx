import PropTypes from 'prop-types';

const QuoteCard = ({ quote, imageUrl }) => {
  return (
    <div
      style={{
        width: '540px',
        height: '960px',
        backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
        color: '#fff',
        fontSize: '2rem',
        fontWeight: 'bold',
        lineHeight: '1.4',
      }}
    >
      <p>{quote}</p>
    </div>
  );
};

QuoteCard.propTypes = {
  quote: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default QuoteCard;
