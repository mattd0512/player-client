import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const PlatformForm = (props) => {
  const { platform, handleChange, handleSubmit, handleDelete } = props

  return (
    <Container className="justify-content-center">

      <Form onSubmit={ handleSubmit }>
        <Form.Label>Username:</Form.Label>
        <Form.Control 
          placeholder="Enter your username..."
          name="name"
          id="name"
          value={ platform.name }
          onChange= { handleChange }
          className="m-1"
        />
        <Form.Select
          aria-label="Platform:"
          name="platform"
          defaultValue={ platform.platform }
          onChange={handleChange}
          className="m-1"
        >
          <option>Which Platform is this Username For...</option>
          <option value="XBOX Live">XBOX Live</option>
          <option value="PSN">PSN</option>
          <option value="Nintendo">Nintendo Online</option>
          <option value="Steam">Steam</option>
          <option value="GoG">GoG</option>
          <option value="Epic">Epic</option>

        </Form.Select>
        <Button className="float-end m-1"type="submit">Submit</Button>

        {platform.name?
        <Button className="float-end m-1" onClick={ ()=>handleDelete() }>Delete</Button>
        :
        null
        }
        
      </Form>
    </Container>
  )
}

export default PlatformForm