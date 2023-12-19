import { useState } from 'react';

import { Section } from './Section/Section';
import { Buttons } from './Buttons/Buttons';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';

import css from './FeedbackList.module.css';

export const FeedbackList = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onClickButton = option => {
    switch (option) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        break;
    }
  };

  //  Сума загальних відгуків
  const countTotalFeedback = () => good + neutral + bad;

  // Відсоток позитивних відгуків
  const countPositiveFeedbackPercentage = () => {
    return countTotalFeedback() > 0
      ? Math.round((good / countTotalFeedback()) * 100)
      : 0;
  };

  return (
    <div>
      <h1 className={css.title}>Please leave feedback</h1>

      <Section title="Feedback Options">
        <Buttons
          keys={Object.keys({ good, neutral, bad })}
          onClickButton={onClickButton}
        />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            percentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
