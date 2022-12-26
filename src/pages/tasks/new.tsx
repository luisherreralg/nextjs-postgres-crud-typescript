import { useRouter } from "next/router";
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  GridColumn,
  Icon,
  Confirm,
} from "semantic-ui-react";
import Layout from "src/components/layout";
import { Task } from "src/interfaces/task";

export default function NewPage() {
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [openConfirm, SetOpenConfirm] = useState(false);

  const handleForm = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTask({ ...task, [name]: value });
  };

  const createTask = async (task: Task) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  const updateTask = async (id: string, task: Task) => {
    await fetch(`http://localhost:3000/api/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  const loadTask = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`);
    const task = await response.json();
    setTask({ title: task.title, description: task.description });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (typeof router.query.id !== "string") {
        await createTask(task);
        return router.push("/");
      }
      updateTask(router.query.id, task);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof router.query.id === "string") loadTask(router.query.id);
  }, [router.query]);

  return (
    <Layout>
      <Grid
        centered
        columns={3}
        verticalAlign="middle"
        stlye={{ height: "70%" }}
      >
        <GridColumn>
          <Card>
            <Card.Content>
              <Form onSubmit={handleSubmit}>
                <Form.Field>
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    placeholder="Write your title"
                    name="title"
                    onChange={handleForm}
                    value={task.title}
                  />
                </Form.Field>
                <Form.Field>
                  <label htmlFor="description">Title:</label>
                  <textarea
                    name="description"
                    rows={2}
                    placeholder="Write your description"
                    onChange={handleForm}
                    value={task.description}
                  ></textarea>
                </Form.Field>
                {typeof router.query.id !== "string" ? (
                  <Button primary>
                    <Icon name="save" />
                    Save
                  </Button>
                ) : (
                  <Button color="teal">
                    <Icon name="refresh" />
                    Update
                  </Button>
                )}
              </Form>
            </Card.Content>
          </Card>

          {typeof router.query.id === "string" && (
            <Button
              color="red"
              onClick={() => {
                SetOpenConfirm(true);
              }}
            >
              <Icon name="delete" />
              Delete
            </Button>
          )}
        </GridColumn>
      </Grid>
      <Confirm
        header="Delete a task"
        content="Are you sure you want to delete this task?"
        open={openConfirm}
        onCancel={() => {
          SetOpenConfirm(false);
        }}
        onConfirm={() => {
          handleDelete(router.query.id as string);
        }}
        style={{ color: "black" }}
      />
    </Layout>
  );
}
