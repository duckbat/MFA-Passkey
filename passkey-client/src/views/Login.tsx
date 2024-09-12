import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const switchForm = () => setIsLogin(!isLogin);
  return (
    <div className="md:w-96 m-auto">
      <Card>
        {isLogin ? <LoginForm /> : <RegisterForm switchForm={switchForm} />}
      </Card>
      <div className="w-full flex justify-center">
        {isLogin ? 'Dont have an account?' : 'Already have an account?'}
      </div>
      <div className="w-full flex justify-center">
        <Button variant="outline" onClick={switchForm}>
          {isLogin ? 'Register' : 'Login'}
        </Button>
      </div>
    </div>
  );
};

export default Login;
