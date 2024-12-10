import { Spin, notification } from "antd";
import { Field } from "formik";
import { useHooks } from "hooks";
import { Container } from "modules";
import { Fields, Button } from "components";

const Project = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  let data = createModal.data && createModal?.data;

  return (
    <div>
      <Container.Form
        url={data._id ? `/projects/${get(data, "_id")}` : "/projects"}
        method={data._id ? "put" : "post"}
        name="projects"
        fields={[
          {
            type: "string",
            required: true,
            name: "titleUz",
            value: get(data, "titleUz"),
          },
          {
            type: "string",
            required: true,
            name: "descriptionUz",
            value: get(data, "descriptionUz"),
          },
          {
            type: "string",
            required: true,
            name: "titleRu",
            value: get(data, "titleRu"),
          },
          {
            type: "string",
            required: true,
            name: "descriptionRu",
            value: get(data, "descriptionRu"),
          },
          {
            type: "string",
            required: true,
            name: "titleEn",
            value: get(data, "titleEn"),
          },
          {
            type: "string",
            required: true,
            name: "descriptionEn",
            value: get(data, "descriptionEn"),
          },
          {
            name: "point",
            required: true,
            type: "number",
            value: get(data, "point"),
          },
          {
            type: "number",
            required: true,
            name: "pointForPereviwer",
            value: get(data, "pointForPereviwer"),
          },
          {
            type: "any",
            required: true,
            name: "subject",
            value: get(data, "subject"),
          },
          {
            type: "any",
            required: true,
            name: "difficulty",
            value: get(data, "difficulty"),
          },
          {
            type: "string",
            required: true,
            name: "tutorials",
            value: get(data, "tutorials"),
          },
          {
            type: "any",
            required: true,
            name: "subject",
            value: get(data, "subject"),
          },
          {
            type: "any",
            required: true,
            name: "difficulty",
            value: get(data, "difficulty"),
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["projects"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          notification.error({
            message: get(error, "errorMessage", t("All fields must be filled")),
            duration: 2,
          });
        }}
      >
        {({ isLoading, setFieldValue }) => {
          return (
            <Spin spinning={isLoading} tip={t("Verifying")}>
              <div className="mt-5">
                <div className="flex">
                  <div className="mr-[15px] w-[50%]">
                    <Field
                      required
                      name="titleUz"
                      label={t("titleUz")}
                      component={Fields.Input}
                      placeholder={t("titleUz")}
                    />
                    <Field
                      required
                      name="titleRu"
                      label={t("titleRu")}
                      component={Fields.Input}
                      placeholder={t("titleRu")}
                    />
                    <Field
                      required
                      name="titleEn"
                      label={t("titleEn")}
                      component={Fields.Input}
                      placeholder={t("titleEn")}
                    />
                    <Field
                      required
                      name="difficulty"
                      url="/difficulties"
                      optionValue="_id"
                      optionLabel="title"
                      label={t("difficulty")}
                      placeholder={t("difficulty")}
                      component={Fields.AsyncSelect}
                      onChange={(value: any) => {
                        setFieldValue("difficulty", value);
                      }}
                    />
                    <Field
                      name="subject"
                      url="/subjects"
                      optionValue="_id"
                      optionLabel="title"
                      label={t("subjects")}
                      placeholder={t("subjects")}
                      component={Fields.AsyncSelect}
                      onChange={(value: any) => {
                        setFieldValue("subject", value);
                      }}
                    />
                  </div>
                  <div className="w-[50%]">
                    <Field
                      required
                      rows={4}
                      name="descriptionUz"
                      label={t("descriptionUz")}
                      component={Fields.Textarea}
                      placeholder={t("descriptionUz")}
                    />
                    <Field
                      required
                      rows={4}
                      name="descriptionRu"
                      label={t("descriptionRu")}
                      component={Fields.Textarea}
                      placeholder={t("descriptionRu")}
                    />
                    <Field
                      required
                      rows={4}
                      name="descriptionEn"
                      label={t("descriptionEn")}
                      component={Fields.Textarea}
                      placeholder={t("descriptionEn")}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div className="flex">
                    <Field
                      required
                      name="point"
                      label={t("point")}
                      component={Fields.Input}
                      placeholder={t("point")}
                      rootClassName="mb-[10px] mr-[10px] w-full"
                    />
                    <Field
                      required
                      component={Fields.Input}
                      name="pointForPereviwer"
                      label={t("pointForPereviwer")}
                      placeholder={t("pointForPereviwer")}
                      rootClassName="mb-[10px] w-full mr-[10px]"
                    />
                  </div>
                  <Field
                    required
                    name="tutorials"
                    component={Fields.Input}
                    label={t("tutorial link")}
                    placeholder={t("tutorial")}
                    rootClassName="mb-[10px] w-full"
                  />
                </div>
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

export default Project;
