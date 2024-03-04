import { Stack, TextInput } from "@mantine/core";
import { useFormik } from "formik";

const CreateSystemFrom = () => {
  const systemForm = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: (values) => {
      console.log("the values", values);
    },
  });
  return (
    <Stack>
      <TextInput
        label="Name"
        placeholder="System Name"
        name="name"
        onChange={systemForm.handleChange}
        value={systemForm.values.name}
        withAsterisk
        error={
          systemForm.touched?.name &&
          systemForm.errors?.name &&
          systemForm.errors?.name
        }
      />
    </Stack>
  );
};

export default CreateSystemFrom;
