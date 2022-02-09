import * as Yup from 'yup';
import { useSnackbar } from 'notistack5';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// utils
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const { updatePassword } = useAuth();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Ancien mot de passe requis'),
    newPassword: Yup.string().min(6, 'Le mot de passe doit être composé au minimum de 6 caractères alpha numérique').required('Un nouveau mot de passe est requis'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Les mots de passe doivent correspondre')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {

      try {
        await updatePassword(values.oldPassword, values.newPassword);
        setSubmitting(false);
        enqueueSnackbar('Mot de passe mise à jour avec succès', { variant: 'success' });
        resetForm();
      } catch (error) {
        setSubmitting(false);
        setErrors({afterSubmit: error});
        console.log(error);
        const message = error.code === "auth/wrong-password" ? "L'Ancien mot de passe ne correspond pas": "Une erreur s'est produite"
        enqueueSnackbar(message, { variant: 'error' });
      }

    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              {...getFieldProps('oldPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Ancien mot de passe"
              error={Boolean(touched.oldPassword && errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
            />

            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Nouveau mot de passe"
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={(touched.newPassword && errors.newPassword) || 'Le mot de passe doit être composé au minimum de 6 caractères alpha numérique'}
            />

            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type="password"
              label="Confirmer le mot de passe"
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Valider
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
