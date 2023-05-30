import { Grid, Typography, Button } from '@mui/material';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import { Helmet } from 'react-helmet-async';

export default function PageHeader(props: pageHeaderProps) {
  return (
    <>
      <Helmet>
        <title>{props.title}</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              {props.title}
            </Typography>
          </Grid>
          {props.hasCreateButton && (
            <Grid item>
              <Button
                sx={{ mt: { xs: 2, md: 0 } }}
                variant="contained"
                onClick={() => {
                  if (props.onCreateButtonClick) {
                    props.onCreateButtonClick();
                  }
                }}
                startIcon={
                  props.icon == 'Agregar' ? (
                    <AddTwoToneIcon />
                  ) : (
                    <SettingsTwoToneIcon />
                  )
                }
              ></Button>
            </Grid>
          )}
        </Grid>
      </PageTitleWrapper>
    </>
  );
}

interface pageHeaderProps {
  title: string;
  hasCreateButton: boolean;
  onCreateButtonClick?: any;
  icon: 'Agregar' | 'Mesas';
}

PageHeader.defaultProps = {
  hasCreateButton: false,
  icon: 'Agregar'
};
