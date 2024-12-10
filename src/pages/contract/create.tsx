import { Spin, notification } from "antd";
import { Field } from "formik";
import { useHooks } from "hooks";
import { Container } from "modules";
import { Fields, Button } from "components";

const Custumer = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `/contracts/${get(data, "_id")}` : "/contracts"}
        method={data._id ? "put" : "post"}
        name="contracts"
        fields={[
          {
            type: "number",
            required: true,
            name: "contractNomer",
            value: get(data, "contractNomer"),
          },
          {
            type: "any",
            required: true,
            name: "customer",
            value: get(data, "customer"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["contracts"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          notification.error({
            message: get(error, "errorMessage", t("Something went wrong!")),
            duration: 2,
          });
        }}
      >
        {({ isLoading, setFieldValue }) => {
          return (
            <Spin spinning={isLoading} tip={t("Verifying")}>
              <div className="mt-5">
                <Field
                  required
                  type="number"
                  name="contractNomer"
                  component={Fields.Input}
                  rootClassName="mb-[10px]"
                  label={t("Contract Number")}
                  placeholder={t("Contract Number")}
                />
                <Field
                  name="customer"
                  url="/customers"
                  optionValue="_id"
                  optionLabel="fullName"
                  label={t("Customer")}
                  placeholder={t("Customer")}
                  component={Fields.AsyncSelect}
                  onChange={(value: any) => {
                    setFieldValue("customer", value);
                  }}
                />
                <Button
                  size="large"
                  title={t("Save")}
                  htmlType="submit"
                  className="w-full mt-[10px]"
                />
              </div>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Custumer;
