import { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { clearNewsletter } from "../../store/reducers/users";
import { addToNewsletter } from "../../store/utils/thunks";
import { showToast } from "./tools";

const Newsletter = () => {
  const textInput = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;

    dispatch(addToNewsletter({ email: value }))
      .unwrap()
      .then((response) => {
        if (response.newsletter === "added") {
          showToast("SUCCESS", "Thank you for subscribing");
          textInput.current.value = "";
        }
        if (response.newsletter === "failed") {
          showToast("ERROR", "You are already registered");

          textInput.current.value = "";
        }
        dispatch(clearNewsletter());
      });
  };

  return (
    <div className="newsletter_container">
      <h1>Join our newsletter</h1>
      <div className="form">
        <Form className="mt-4" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="youremail@email.com"
              name="email"
              ref={textInput}
            />
          </Form.Group>
          <Button className="mt-2" variant="primary" type="submit">
            Add me to the list
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Newsletter;
