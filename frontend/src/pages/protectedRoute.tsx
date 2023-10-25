import { selectUser } from '@/redux/slices/user.slice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
  user: any;
};

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  let location = useLocation();

  if (!user.email) {
    return <Navigate to="/session/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
