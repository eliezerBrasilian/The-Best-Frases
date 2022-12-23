import react from 'react';
import Routes from './src/routes';
import AuthProvider from './src/contexts';
export default function App(){
  return(
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  ) 
}