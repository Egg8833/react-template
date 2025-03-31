import React from "react";
import { Button, Typography, Paper, Box } from "@mui/material";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectBase from "@/components/RHForm/SelectBase";
import InputBase from "@/components/RHForm/InputBase";
import {
  login2Schema,
  login2DefaultValues,
  Login2FormData,
} from "@/type/login2Schema";

const Login2: React.FC = () => {
  const methods = useForm<Login2FormData>({
    mode: "all",
    resolver: zodResolver(login2Schema),
    defaultValues: login2DefaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<Login2FormData> = (data) => {
    console.log(data);
  };

  const lineOptions = [
    { value: "F999000", label: "F999000" },
    { value: "F888000", label: "F888000" },
  ];

  const brokerOptions = [
    { value: "F999000", label: "F999000" },
    { value: "F888000", label: "F888000" },
  ];

  return (
    <Box sx={{ margin: "auto", marginTop: "100px" }}>
      <Paper elevation={3} sx={{ padding: 12, }}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" gutterBottom>
              登入
            </Typography>
            <div className="flex flex-col gap-4">
              <SelectBase
                selectName="線路期貨商"
                selectId="lineBroker"
                options={lineOptions}
                labelWidth="100px"
                selectWidth="300px"
                labelRow={false}
              />
              <SelectBase
                selectName="期貨商代號"
                selectId="brokerCode"
                options={brokerOptions}
                labelWidth="100px"
                selectWidth="300px"
                labelRow={false}
              />
              <InputBase
                inputName="登入帳號"
                inputId="account"
                labelWidth="100px"
                inputWidth="300px"
                labelRow={false}
              />
              <InputBase
                inputName="密碼"
                inputId="password"
                labelWidth="100px"
                inputWidth="300px"
                labelRow={false}
                type="password"
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ width: "300px", mt: 1 }}
            >
              登入
            </Button>
          </form>
        </FormProvider>
      </Paper>
    </Box>
  );
};

export default Login2;
