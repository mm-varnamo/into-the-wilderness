import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import useOutsideClick from '../hooks/useOutsideClick';

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-500);
	}
`;

interface ModalContextType {
	openName: string;
	close: () => void;
	open: (name: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProps {
	children: React.ReactNode;
}

const Modal = ({ children }: ModalProps) => {
	const [openName, setOpenName] = useState('');

	const close = () => setOpenName('');
	const open = setOpenName;

	return (
		<ModalContext.Provider value={{ openName, close, open }}>
			{children}
		</ModalContext.Provider>
	);
};

interface OpenProps {
	children: React.ReactElement;
	opens: string;
}

const Open = ({ children, opens: opensWindowName }: OpenProps) => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('Open must be used within a ModalProvider');
	}

	const { open } = context;

	return cloneElement(children, {
		onClick: () => open(opensWindowName),
	});
};

interface WindowProps {
	children: React.ReactElement;
	name: string;
}

const Window = ({ children, name }: WindowProps) => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error('Window must be used within a ModalProvider');
	}

	const { openName, close } = context;

	const ref = useOutsideClick(close);

	if (name !== openName) return null;

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={close}>
					<HiXMark />
				</Button>
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
