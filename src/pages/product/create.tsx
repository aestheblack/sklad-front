import { Spin, notification } from "antd";
import { Field } from "formik";
import { useHooks } from "hooks";
import { Container } from "modules";
import { Fields, Button } from "components";

const Product = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;
  return (
    <div>
      <Container.Form
        url={data._id ? `/products/${get(data, "_id")}` : "/products"}
        method={data._id ? "put" : "post"}
        name="products"
        fields={[
          {
            type: "string",
            required: true,
            name: "name",
            value: get(data, "name"),
          },
          {
            type: "number",
            required: true,
            name: "barCode",
            value: get(data, "barCode"),
          },
          {
            type: "number",
            required: true,
            name: "quantity",
            value: get(data, "quantity"),
          },
          {
            type: "number",
            required: true,
            name: "price",
            value: get(data, "price"),
          },
          {
            type: "any",
            required: true,
            name: "category",
            value: get(data, "category"),
          },
          {
            type: "any",
            required: true,
            name: "customer",
            value: get(data, "customer"),
          },
          {
            name: "photoUrl",
            value: get(data, "photoUrl"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["products"] });
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
                <div className="flex">
                  <div className="mr-10"> 
                    <Field
                      required
                      name="name"
                      component={Fields.Input}
                      rootClassName="mb-[10px]"
                      label={t("Name")}
                      placeholder={t("Name")}
                    />
                    <Field
                      required
                      type="number"
                      name="barCode"
                      component={Fields.Input}
                      rootClassName="mb-[10px]"
                      label={t("Bar Code")}
                      placeholder={t("Bar Code")}
                    />
                    <Field
                      required
                      type="number"
                      name="quantity"
                      component={Fields.Input}
                      rootClassName="mb-[10px]"
                      label={t("Quantity")}
                      placeholder={t("Quantity")}
                    />
                  </div>
                  <div>
                    <Field
                      required
                      type="number"
                      name="price"
                      component={Fields.Input}
                      rootClassName="mb-[10px]"
                      label={t("Price")}
                      placeholder={t("Price")}
                    />
                    <Field
                      name="category"
                      url="/categories"
                      optionValue="_id"
                      optionLabel="name"
                      label={t("Category")}
                      placeholder={t("Category")}
                      component={Fields.AsyncSelect}
                      onChange={(value: any) => {
                        setFieldValue("category", value);
                      }}
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
                  </div>
                </div>
                <Field
                  name="photoUrl"
                  component={Fields.FileUpload3}
                  rootClassName="mb-[10px]"
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

export default Product;
