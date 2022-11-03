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
                    name="review"
                    id="review"
                    value= { review.comment }
                    onChange={ handleChange }
                />
                <Form.Label>Score</Form.Label>
                <Form.Control 
                    placeholder=""
                    name="score"
                    id="score"
                    value= { review.score }
                    onChange={ handleChange }
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    )
}

export default ReviewForm