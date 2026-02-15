import React from 'react';
import { Loader } from './Loader';
import { useLoading } from '../../contexts/LoadingContext';

export const LoaderWrapper: React.FC = () => {
  const { isLoading, loadingMessage } = useLoading();
  
  return <Loader open={isLoading} message={loadingMessage} />;
};
