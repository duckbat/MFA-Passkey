import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useUserContext } from '@/hooks/contextHooks';
import { Credentials } from '@/types/LocalTypes';
import { useForm } from '@/hooks/formHooks';

const LoginForm = () => {
  const { handleLogin } = useUserContext();

  const initValues: Credentials = { email: '', code: '' };

  const doLogin = async () => {
    handleLogin(inputs as Credentials);
  };

  const { handleSubmit, handleInputChange, inputs } = useForm(
    doLogin,
    initValues,
  );

  return (
    <form onSubmit={handleSubmit}>
      <CardHeader className="text-center">
        <h2 className="text-2xl font-bold">Login</h2>
      </CardHeader>
      <CardContent className="space-y-4 px-6 py-8">
        <div className="space-y-2">
          <Label htmlFor="email">email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Code from authenticator</Label>
          <Input
            id="code"
            name="code"
            type="text"
            required
            onChange={handleInputChange}
          />
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <div className="w-full flex justify-center">
          <Button type="submit">Login</Button>
        </div>
      </CardFooter>
    </form>
  );
};

export default LoginForm;
