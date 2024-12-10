import { useState, useEffect } from "react";
import { Col, Row, Modal, notification, message, Input } from "antd";
import { Container } from "modules";
import { Button } from "components";
import More from "./more";
import Create from "./create";
import { useHooks, usePost } from "hooks";
import { Delete, Edit, CreateDoc } from "assets/images/icons";
import Avatar from "assets/images/27470334_7309681.jpg";
import axios from "axios";

const Student = () => {
  const { get, queryClient, t } = useHooks();
  const [createModal, showCreateModal] = useState({ open: false, data: {} });
  const [moreModal, showMoreModal] = useState({ open: false, data: {} });
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const { mutate } = usePost();

  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить ?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const handleSearch = async (value: string) => {
    setSearch(value);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_ROOT_API}/students/search?search=${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setFilteredItems(response.data.data);
    } catch (err) {
      message.error(t("Failed to fetch search results"));
    }
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/students/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`students`],
            });
            notification["success"]({
              message: t("Успешно удалена"),
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", t("Произошло ошибка!")),
              duration: 2,
            });
          },
        }
      );
    }
  };

  useEffect(() => {
    if (!search) {
      setFilteredItems([]);
    }
  }, [search]);

  return (
    <div className="flex">
      <Modal
        open={createModal.open}
        onCancel={() => showCreateModal({ open: false, data: {} })}
        footer={null}
        centered
        title={
          get(createModal, "data._id")
            ? t("Update student")
            : t("Create student")
        }
        width={500}
        destroyOnClose
      >
        <Create {...{ showCreateModal, createModal }} />
      </Modal>
      <Modal
        open={moreModal?.open}
        onOk={() => showMoreModal({ open: true, data: {} })}
        onCancel={() => showMoreModal({ open: false, data: {} })}
        footer={null}
        centered
        title={t("More informaiton")}
        width={500}
        destroyOnClose
      >
        <More {...{ showMoreModal, moreModal }} />
      </Modal>
      <div>
        <Container.All name="students" url="/students">
          {({ items }) => {
            const displayItems = search ? filteredItems : items;
            return (
              <div>
                <div className="flex justify-between">
                  <Button
                    title={t("Create student")}
                    icon={<CreateDoc />}
                    size="large"
                    className="bg-[#002855] mb-4"
                    onClick={() => showCreateModal({ open: true, data: {} })}
                  />
                </div>
                {/* <Input.Search
                  placeholder={t("Search students")}
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                /> */}
                <Row className="h-[120px] mt-[15px]">
                  {displayItems.map((card) => {
                    return (
                      <Col
                        className="flex items-baseline justify-center cursor-pointer"
                        onClick={() =>
                          showMoreModal({ open: true, data: card })
                        }
                      >
                        <div className="mr-8 mb-4">
                          <img
                            className="object-cover rounded-[10px] w-[260px] h-[200px]"
                            src={get(card, "photoUrl.0", Avatar)}
                          />
                          <div className="btnPanel2">
                            <div
                              className="editBtn"
                              onClick={(e) => {
                                e.stopPropagation();
                                showCreateModal({ open: true, data: card });
                              }}
                            >
                              <Edit />
                            </div>
                            <div
                              className="deleteBtn"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteHandler(get(card, "_id", ""));
                              }}
                            >
                              <Delete />
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            );
          }}
        </Container.All>
      </div>
    </div>
  );
};

export default Student;