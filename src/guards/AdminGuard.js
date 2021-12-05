import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function AdminGuard({ children }) {
  const { user: { isAdmin } } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    !isAdmin && navigate('/');
  }, [isAdmin, navigate]);

  return (
    <>
      {children}
    </>
  );
}