import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAPI, setToken } from "@/components/api/authApi";

const Login = () => {
  const navigate = useNavigate();

  const formSchema = z.object({
    username: z.string().min(2).max(50).trim(),
    password: z.string().min(4).max(50).trim(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await loginAPI(values);
    if (response.status === 200) {
      setToken(response.data.DATA);
      navigate("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="w-1/2 sm:w-2/5 lg:w-1/4">
        <p className="py-6 text-3xl font-extrabold text-center">SQL GUi .</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>

            <div className="flex items-center justify-center gap-1">
              <p className="text-muted-foreground text-xs">Made with ❤️</p>
              <p className="text-primary text-xs">@idebenone</p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
