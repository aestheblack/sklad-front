import { Switch } from 'antd';
import { useField, FieldProps, FormikProps } from 'formik';

interface CustomSwitchProps extends FieldProps {
  form: FormikProps<any>;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ field, form, ...props }) => {
  const [inputProps] = useField(field.name);

  const handleChange = (checked: boolean) => {
    form.setFieldValue(field.name, checked);
  };

  return (
    <Switch
    
      checked={inputProps.value}
      onChange={handleChange}
      {...props}
    />
  );
};

export default CustomSwitch;