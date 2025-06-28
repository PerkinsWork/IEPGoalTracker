import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { watchAuth } from '../services/auth';

export default function RequireAuth() {
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = watchAuth(setUser);
    return unsub;
  }, []);

  useEffect(() => {
    if (user === null) navigate('/auth');
  }, [user, navigate]);

  if (!user) return user === undefined ? null : null;
  return <Outlet />;
}
