const Sentiment = require('sentiment');
const translatte = require('translatte');

exports.sentimentAnalysis = async text => {
  const translated = await translatte(text, {
    from: 'id',
    to: 'en'
  });
  const sentiment = new Sentiment();
  const result = sentiment.analyze(translated.text);
  return result.comparative;
};
