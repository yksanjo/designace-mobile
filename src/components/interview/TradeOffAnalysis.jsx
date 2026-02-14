import { useState } from 'react';
import styles from './TradeOffAnalysis.module.css';

const TRADE_OFF_DATA = {
  Scalability: {
    items: [
      { name: 'Scalability', left: 'Single Server', right: 'Distributed', default: 70 },
      { name: 'Cost', left: 'Low', right: 'High', default: 30 },
      { name: 'Complexity', left: 'Simple', right: 'Complex', default: 40 },
      { name: 'Latency', left: 'Low', right: 'High', default: 60 },
      { name: 'Maintainability', left: 'Easy', right: 'Hard', default: 40 },
    ],
  },
  'Distributed Systems': {
    items: [
      { name: 'Consistency', left: 'Strong', right: 'Eventual', default: 50 },
      { name: 'Availability', left: 'Low', right: 'High', default: 80 },
      { name: 'Partition Tolerance', left: 'No', right: 'Yes', default: 90 },
      { name: 'Complexity', left: 'Simple', right: 'Complex', default: 70 },
      { name: 'Latency', left: 'Low', right: 'High', default: 60 },
    ],
  },
  'Database Design': {
    items: [
      { name: 'Read Speed', left: 'Slow', right: 'Fast', default: 70 },
      { name: 'Write Speed', left: 'Slow', right: 'Fast', default: 60 },
      { name: 'Consistency', left: 'Strong', right: 'Eventual', default: 70 },
      { name: 'Scalability', left: 'Vertical', right: 'Horizontal', default: 50 },
      { name: 'Complexity', left: 'Simple', right: 'Complex', default: 40 },
    ],
  },
  'API Design': {
    items: [
      { name: 'Flexibility', left: 'Rigid', right: 'Flexible', default: 60 },
      { name: 'Performance', left: 'Fast', right: 'Optimized', default: 70 },
      { name: 'Complexity', left: 'Simple', right: 'Complex', default: 50 },
      { name: 'Versioning', left: 'Easy', right: 'Hard', default: 40 },
      { name: 'Documentation', left: 'Minimal', right: 'Extensive', default: 60 },
    ],
  },
  Caching: {
    items: [
      { name: 'Hit Ratio', left: 'Low', right: 'High', default: 70 },
      { name: 'Complexity', left: 'Simple', right: 'Complex', default: 40 },
      { name: 'Consistency', left: 'Strong', right: 'Eventual', default: 60 },
      { name: 'Cost', left: 'Low', right: 'High', default: 30 },
      { name: 'Latency', left: 'High', right: 'Low', default: 80 },
    ],
  },
  Microservices: {
    items: [
      { name: 'Deployment', left: 'Monolithic', right: 'Independent', default: 90 },
      { name: 'Complexity', left: 'Simple', right: 'Complex', default: 80 },
      { name: 'Scalability', left: 'Limited', right: 'High', default: 90 },
      { name: 'Debugging', left: 'Easy', right: 'Hard', default: 30 },
      { name: 'Consistency', left: 'Strong', right: 'Eventual', default: 60 },
    ],
  },
};

export default function TradeOffAnalysis({ category }) {
  const tradeOffs = TRADE_OFF_DATA[category] || TRADE_OFF_DATA['Scalability'];
  const [values, setValues] = useState(() => 
    tradeOffs.items.reduce((acc, item) => ({ ...acc, [item.name]: item.default }), {})
  );

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: parseInt(value) }));
  };

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>Trade-off Analysis</h4>
      <p className={styles.subtitle}>Adjust sliders to compare design choices</p>
      
      <div className={styles.sliders}>
        {tradeOffs.items.map((item) => (
          <div key={item.name} className={styles.sliderGroup}>
            <div className={styles.sliderLabels}>
              <span className={styles.labelLeft}>{item.left}</span>
              <span className={styles.labelName}>{item.name}</span>
              <span className={styles.labelRight}>{item.right}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={values[item.name]}
              onChange={(e) => handleChange(item.name, e.target.value)}
              className={styles.slider}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
