import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack5';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText, FormControlLabel
  // FormControlLabel
} from '@material-ui/core';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import Label from '../../Label';
import { UploadAvatar } from '../../upload';
import countries from './countries';
import { useDispatch } from '../../../redux/store';
import { createUser, updateUser } from '../../../redux/slices/user.thunk';
import PhoneInput from 'react-phone-input-2';
import ErrorHelper from '../../ErrorHelper';
import 'react-phone-input-2/lib/style.css';
import { isEmpty } from 'lodash';
import { multipleFilesSave } from '../../../utils/document';
import { isFile } from '../../../utils/type_check';

// ----------------------------------------------------------------------

UserNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

export default function UserNewForm({ isEdit, currentUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Le nom est requis'),
    email: Yup.string().required('L\'Email est requis').email(),
    ...(!isEdit ? { password: Yup.string().required('Le mot de passe est requis') } : null)
    // phoneNumber: Yup.string().required('Le numero de tel est requis'),
    // address: Yup.string().required('Address is required'),
    // country: Yup.string().required('country is required'),
    // company: Yup.string().required('Company is required'),
    // state: Yup.string().required('State is required'),
    // city: Yup.string().required('City is required'),
    // role: Yup.string().required('Role Number is required'),
    // avatarUrl: Yup.mixed().required('Avatar is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: currentUser?.displayName || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      photoURL: currentUser?.photoURL || null,
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || '',

      isAdmin: currentUser?.isAdmin || false,
      disabled: currentUser?.disabled || false,

      password: ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {

        const callback = () => {
          resetForm();
          setSubmitting(false);
          enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
          navigate(PATH_DASHBOARD.user.list);
        };

        const { password, phoneNumber, photoURL, status, avatarUrl, ...rest } = values;


        await multipleFilesSave([avatarUrl].filter(one => isFile(one)), (list = []) => {
          const [avatar] = list;

          const data = {
            ...rest,
            ...(isEmpty(phoneNumber) ? null : { phoneNumber }),
            ...(isEmpty(password) ? null : { password }),
            ...(isEmpty(photoURL) ? null : { photoURL }),
            ...(avatar ? { photoURL: avatar?.url || null } : null)
          };
          console.log(data);

          isEdit
            ? dispatch(updateUser({ ...currentUser, ...data, updatedAt: new Date() }, callback))
            : dispatch(createUser(data, callback));
        });


      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              {isEdit && (
                <Label
                  color={values.status !== 'active' ? 'error' : 'success'}
                  sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                >
                  {values.status}
                </Label>
              )}

              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept='image/*'
                  file={values.avatarUrl}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.photoURL && errors.photoURL)}
                  caption={
                    <Typography
                      variant='caption'
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      Allowed *.jpeg, *.jpg, *.png, *.gif
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
                />
                <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                  {touched.photoURL && errors.photoURL}
                </FormHelperText>
              </Box>

              <FormControlLabel
                labelPlacement='start'
                control={
                  <Switch
                    onChange={(event) => setFieldValue('disabled', event.target.checked)}
                    checked={!values.disabled}
                  />
                }
                label={
                  <Typography variant='subtitle2' sx={{ mb: 0.5 }}>
                    Est Actif?
                  </Typography>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />

              <FormControlLabel
                labelPlacement='start'
                control={
                  <Switch
                    onChange={(event) => setFieldValue('isAdmin', event.target.checked)}
                    checked={values.isAdmin}
                  />
                }
                label={
                  <Typography variant='subtitle2' sx={{ mb: 0.5 }}>
                    Est Admin?
                  </Typography>
                }
                sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
              />

              {/*<FormControlLabel*/}
              {/*  labelPlacement='start'*/}
              {/*  control={<Switch {...getFieldProps('isVerified')} checked={values.isVerified} />}*/}
              {/*  label={*/}
              {/*    <>*/}
              {/*      <Typography variant='subtitle2' sx={{ mb: 0.5 }}>*/}
              {/*        Email Verified*/}
              {/*      </Typography>*/}
              {/*      <Typography variant='body2' sx={{ color: 'text.secondary' }}>*/}
              {/*        Disabling this will automatically send the user a verification email*/}
              {/*      </Typography>*/}
              {/*    </>*/}
              {/*  }*/}
              {/*  sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}*/}
              {/*/>*/}
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label='Nom complet'
                    {...getFieldProps('displayName')}
                    error={Boolean(touched.displayName && errors.displayName)}
                    helperText={touched.displayName && errors.displayName}
                  />
                  <TextField
                    fullWidth
                    disabled={isEdit}
                    label='Email Address'
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <Stack direction={'column'}>
                    <PhoneInput
                      country={'tg'}
                      // value={this.state.phone}
                      // onChange={phone => console.log(phone)}
                      inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true

                      }}
                      inputStyle={{
                        width: '19vw',
                        height: 56
                      }}
                      {...getFieldProps('phoneNumber')}
                    />
                    <ErrorHelper
                      error={touched.phoneNumber && errors.phoneNumber}
                    />
                  </Stack>

                  <TextField
                    select
                    fullWidth
                    label='Pays'
                    placeholder='Country'
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value='' />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label='State/Region'
                    {...getFieldProps('state')}
                    error={Boolean(touched.state && errors.state)}
                    helperText={touched.state && errors.state}
                  />
                  <TextField
                    fullWidth
                    label='City'
                    {...getFieldProps('city')}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label='Address'
                    {...getFieldProps('address')}
                    error={Boolean(touched.address && errors.address)}
                    helperText={touched.address && errors.address}
                  />
                  <TextField fullWidth label='Zip/Code' {...getFieldProps('zipCode')} />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label='Company'
                    {...getFieldProps('company')}
                    error={Boolean(touched.company && errors.company)}
                    helperText={touched.company && errors.company}
                  />
                  <TextField
                    fullWidth
                    label='Role'
                    {...getFieldProps('role')}
                    error={Boolean(touched.role && errors.role)}
                    helperText={touched.role && errors.role}
                  />
                </Stack>

                <TextField
                  fullWidth
                  label='Mot de passe'
                  {...getFieldProps('password')}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type='submit' variant='contained' loading={isSubmitting}>
                    {!isEdit ? 'Créer l\'utilisateur' : 'Sauvegarder les modifications'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
