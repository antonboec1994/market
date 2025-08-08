import styles from "./Tabs.module.scss";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel: React.FC<TabPanelProps> = ({ children, index, value, ...other }) => {
  return (
    <div className={styles.gallery__tabs_tab_content} role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
};

export default TabPanel;
