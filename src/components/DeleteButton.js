import {useState, forwardRef, useImperativeHandle} from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import {DeleteButtonWrapper} from './styled/DeleteButton.styled';

const DeleteButton = forwardRef(({className, children, onClick}, ref) => {
  const [disabled, setDisabled] = useState(true);

  useImperativeHandle(ref, () => ({
    setDisabledState: (disabled) => setDisabled(disabled),
  }));

  return (
    <DeleteButtonWrapper className={className} $disabled={disabled}>
      <Button disabled={disabled} onClick={onClick} $disabledHover>
        {children}
      </Button>
    </DeleteButtonWrapper>
  );
});

DeleteButton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

DeleteButton.displayName = 'DeleteButton';

export default DeleteButton;
