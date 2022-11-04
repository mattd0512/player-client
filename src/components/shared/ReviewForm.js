import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const ReviewForm = (props) => {
    const {review, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{ heading }</h3>
            <Form onSubmit={ handleSubmit }>
                <Form.Label>Leave a review:</Form.Label>
                <Form.Control 
                    placeholder="Tell us what you think!"
                    comment="comment"
                    id="comment"
                    value= { review.comment }
                    onChange={ handleChange }
                />
                 <Form.Select
                    aria-label="game rating"
                    name="score"
                    defaultValue={review.score}
                    onChange={handleChange}
                >
                    <option>Open this select menu</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                </Form.Select>
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ReviewForm