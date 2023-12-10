import { render, screen, fireEvent, act } from '@testing-library/react';

import
  EmployeeForm
from '@/components/Forms/Employee/EmployeeForm/EmployeeForm';

describe('EmployeeForm', () => {
  it('should render EmployeeForm unchanged', () => {
    const closeCallback = jest.fn();
    const onFormSubmit = jest.fn();
    const onFormValidityChange = jest.fn();

    const { container } = render(
      <EmployeeForm
        closeCallback={closeCallback}
        onFormSubmit={onFormSubmit}
        onFormValidityChange={onFormValidityChange}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render EmployeeForm', () => {
    const closeCallback = jest.fn();
    const onFormSubmit = jest.fn();
    const onFormValidityChange = jest.fn();

    render(
      <EmployeeForm
        closeCallback={closeCallback}
        onFormSubmit={onFormSubmit}
        onFormValidityChange={onFormValidityChange}
      />,
    );

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Avatar URL')).toBeInTheDocument();
  });

  it('should show the helper text', () => {
    const closeCallback = jest.fn();
    const onFormSubmit = jest.fn();
    const onFormValidityChange = jest.fn();

    render(
      <EmployeeForm
        closeCallback={closeCallback}
        onFormSubmit={onFormSubmit}
        onFormValidityChange={onFormValidityChange}
      />,
    );

    expect(screen.getByText('Nome do empregado')).toBeInTheDocument();
    expect(
      screen.getByText('URL para avatar do empregado'),
    ).toBeInTheDocument();
  });

  it('should show validation errors if form is invalid', async () => {
    const closeCallback = jest.fn();
    const onFormSubmit = jest.fn();
    const onFormValidityChange = jest.fn();

    render(
      <EmployeeForm
        closeCallback={closeCallback}
        onFormSubmit={onFormSubmit}
        onFormValidityChange={onFormValidityChange}
      />,
    );

    const input = screen.getByLabelText('Nome');
    const avatarInput = screen.getByLabelText('Avatar URL');
    const hiddenButton = screen.getByTestId('hidden-button');

    await act(() => {
      fireEvent.blur(input, { target: { value: '' } });

      fireEvent.blur(avatarInput, { target: { value: '' } });
    });

    expect(screen.getByText('Nome é obrigatório')).toBeInTheDocument();
    expect(
      screen.getByText('Um link para um avatar é necessário'),
    ).toBeInTheDocument();
    expect(hiddenButton).toBeDisabled();
  });

  it('should allow button submit if form is valid', async () => {
    const closeCallback = jest.fn();
    const onFormSubmit = jest.fn();
    const onFormValidityChange = jest.fn();

    render(
      <EmployeeForm
        closeCallback={closeCallback}
        onFormSubmit={onFormSubmit}
        onFormValidityChange={onFormValidityChange}
      />,
    );

    const input = screen.getByLabelText('Nome');
    const avatarInput = screen.getByLabelText('Avatar URL');
    const hiddenButton = screen.getByTestId('hidden-button');

    await act(() => {
      fireEvent.change(input, { target: { value: 'John Doe' } });
      fireEvent.change(avatarInput, {
        target: { value: 'https://example.com' },
      });
    });
    expect(hiddenButton).toBeEnabled();
    expect(hiddenButton).not.toBeDisabled();

    await act(() => {
      fireEvent.click(hiddenButton);
    });

    expect(onFormSubmit).toHaveBeenCalledTimes(1);
    expect(closeCallback).toHaveBeenCalledTimes(1);
    expect(onFormValidityChange).toHaveBeenCalled();
    expect(hiddenButton).toBeDisabled();
    expect(hiddenButton).not.toBeEnabled();
  });

  it(
    'should call onFormValidityChange when form validity changes',
      async () => {
      const closeCallback = jest.fn();
      const onFormSubmit = jest.fn();
      const mockOnFormValidityChange = jest.fn();

      render(
        <EmployeeForm
          closeCallback={closeCallback}
          onFormSubmit={onFormSubmit}
          onFormValidityChange={mockOnFormValidityChange}
        />,
      );

      expect(mockOnFormValidityChange).toHaveBeenCalledWith(false);

      const input = screen.getByLabelText('Nome');
      const avatarInput = screen.getByLabelText('Avatar URL');

      await act(async () => {
        fireEvent.change(input, { target: { value: 'John Doe' } });
        fireEvent.change(avatarInput, {
          target: { value: 'https://example.com' },
        });
      });

      expect(mockOnFormValidityChange).toHaveBeenCalledWith(true);
    },
  );
});
