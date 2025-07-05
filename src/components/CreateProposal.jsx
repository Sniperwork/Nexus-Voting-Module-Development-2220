import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
`;

const Label = styled.label`
  display: block;
  color: #00d4ff;
  font-weight: 500;
  margin-bottom: 8px;
  font-size: 1.1rem;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 14px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 14px;
  color: #fff;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #00d4ff;
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #00d4ff, #00ff88);
  color: #000;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 212, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CreateProposal = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 30
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ title: '', description: '', duration: 30 });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Proposal Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter proposal title"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="description">Description</Label>
        <TextArea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your proposal in detail"
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="duration">Voting Duration (days)</Label>
        <Input
          type="number"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          min="1"
          max="365"
          required
        />
      </FormGroup>

      <SubmitButton type="submit">
        Create Proposal
      </SubmitButton>
    </Form>
  );
};

export default CreateProposal;