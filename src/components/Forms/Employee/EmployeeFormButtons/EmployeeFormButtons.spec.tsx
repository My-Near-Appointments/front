/**
 * @jest-environment jsdom
 */
import { render, fireEvent, screen } from '@testing-library/react';

import {
  EmployeeFormButtons,
} from '@/components/Forms/Employee/EmployeeFormButtons/EmployeeFormButtons';

describe('EmployeeFormButtons', () => {
  it('should render EmployeeFormButtons unchanged', () => {
    const handleSubmit = jest.fn();
    const closeCallback = jest.fn();

    const { container } = render(
      <EmployeeFormButtons
        isValid={true}
        handleSubmit={handleSubmit}
        closeCallback={closeCallback}
      />
    );
    expect(container).toMatchSnapshot();
  })

  it('should render the component', () => {
    const handleSubmit = jest.fn();
    const closeCallback = jest.fn();

    render(
      <EmployeeFormButtons
        isValid={true}
        handleSubmit={handleSubmit}
        closeCallback={closeCallback}
      />,
    );

    expect(screen.getByText('Enviar')).toBeInTheDocument();
    expect(screen.getByText('Cancelar')).toBeInTheDocument();
    expect(screen.getByText('Enviar')).toBeEnabled();
    expect(screen.getByText('Cancelar')).toBeEnabled();

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(closeCallback).not.toHaveBeenCalled();
  });

  it('should call handleSubmit when the submit button is clicked', () => {
    const handleSubmit = jest.fn();

    render(
      <EmployeeFormButtons
        isValid={true}
        handleSubmit={handleSubmit}
        closeCallback={jest.fn()}
      />,
    );

    fireEvent.click(screen.getByText('Enviar'));

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('should call closeCallback when the cancel button is clicked', () => {
    const closeCallback = jest.fn();

    render(
      <EmployeeFormButtons
        isValid={true}
        handleSubmit={jest.fn()}
        closeCallback={closeCallback}
      />,
    );

    fireEvent.click(screen.getByText('Cancelar'));

    expect(closeCallback).toHaveBeenCalled();
  });

  it('should disable the submit button when isValid is false', () => {
    const handleSubmit = jest.fn();
    const closeCallback = jest.fn();

    render(
      <EmployeeFormButtons
        isValid={false}
        handleSubmit={handleSubmit}
        closeCallback={closeCallback}
      />,
    );

    expect(screen.getByText('Enviar')).toBeDisabled();
  });
});
