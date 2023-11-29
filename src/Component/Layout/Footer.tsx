import { Container, Typography } from '@mui/material';
export function Footer() {
    return (
      <footer style={{ backgroundColor: 'grey', position: 'fixed', bottom: 0, width: '100%' }}>
        <Container maxWidth="md">
          <div style={{ padding: '1rem', textAlign: 'center' }}>
            <Typography variant="h6" color="textPrimary">
              This is footer
            </Typography>
          </div>
        </Container>
      </footer>
    );
  }

