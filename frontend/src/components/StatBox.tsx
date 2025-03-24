import "./StatBox.css";

const StatBox = ({
  title,
  value,
  subtitle,
  icon,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}) => (
  <div className="stat-box">
    <div className="stat-box__icon">{icon}</div>
    <h3 className="stat-box__title">{title}</h3>
    <p className="stat-box__value">{value}</p>
    {subtitle && <small className="stat-box__subtitle">{subtitle}</small>}
  </div>
);

export default StatBox;