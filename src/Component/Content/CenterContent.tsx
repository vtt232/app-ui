import { CenteredContentProps } from "../../Type/MuiType";
export const CenteredContent: React.FC<CenteredContentProps> = ({ children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      {children}
    </div>
);