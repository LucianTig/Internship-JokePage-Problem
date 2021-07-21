import "./App.css";
import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { Row, Col } from "reactstrap";
import * as API_JOKES from "./commons/jokes-api";
import { increment, decrement } from "./actions";
import { connect } from "react-redux";
import styled from "styled-components";

const StyledCounter = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonIncDec = styled.button`
  background-color: #e7e7e7;
  border: none;
  color: balck;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 30px;
  border-radius: 12px;
  width: 10%;
  margin-right: 5px;
  margin-left: 5px;
`;

const SyledH1 = styled.h1`
  border: 5px solid #e7e7e7;
  padding: 10px;
  width: auto;
  min-width: 10%;
  text-align: center;
`;

const mapStateToProps = (state) => ({
  value: state.counter.value
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement())
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      jokes: {},
      categories: [],
      error: 0,
      errorStatus: 0
    };

    this.handleRemoveCategory = this.handleRemoveCategory.bind(this);
    this.getJoke = this.getJoke.bind(this);
    this.handleNextJoke = this.handleNextJoke.bind(this);
  }

  componentDidMount() {
    this.getAllCategories();
  }

  getJoke(category) {
    API_JOKES.getJokes(category, (result, status, error) => {
      if (result !== null && (status === 200 || status === 201)) {
        const jokes = this.state.jokes;
        jokes[result.categories[0]] = result.value;
        this.setState({
          jokes: jokes
        });
      } else {
        this.setState({
          errorStatus: status,
          error: error
        });
      }
    });
  }

  getAllCategories() {
    API_JOKES.getAllCategories(null, (result, status, error) => {
      if (result !== null && (status === 200 || status === 201)) {
        this.setState({
          categories: result
        });
        for (const category of result) {
          const jokes = this.state.jokes;
          jokes[category] = "Loading joke...";
          this.setState({
            jokes: jokes
          });
          this.getJoke(category);
        }
      } else {
        this.setState({
          errorStatus: status,
          error: error
        });
      }
    });
  }

  handleRemoveCategory(event) {
    let categories = this.state.categories;
    categories = categories.filter((cat) => cat !== event);
    this.setState({
      categories: categories
    });
  }

  handleNextJoke(event) {
    const jokes = this.state.jokes;
    jokes[event] = "Loading joke...";
    this.setState({
      jokes: jokes
    });
    this.getJoke(event);
  }

  render() {
    const { value, increment, decrement } = this.props;
    console.log(value);

    return (
      <div>
        <Container>
          <h1 className="text-center mt-3 mb-4">Jokes page</h1>
          <StyledCounter>
            <ButtonIncDec onClick={decrement}>-</ButtonIncDec>
            <SyledH1>{value}</SyledH1>
            <ButtonIncDec onClick={increment}>+</ButtonIncDec>
          </StyledCounter>
          {this.state.categories.map((item) => {
            return (
              <Row className="mt-4">
                <Col md={{ size: 6, offset: 3 }}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{item}</Card.Title>
                      <Card.Text>{this.state.jokes[item]}</Card.Text>
                      <Button
                        key={item}
                        className="m-1"
                        variant="secondary"
                        onClick={this.handleRemoveCategory.bind(this, item)}
                      >
                        Remove Category
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={this.handleNextJoke.bind(this, item)}
                      >
                        Next joke
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
