'use client'
import { FC, useState, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@heroui/button';
import MyButton from '@/components/UI/Button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { useAppSelector } from '@/hooks/redux';
import { NpCitySearch } from '@/components/UI/NpCitySearch';
import Quantity from '@/components/UI/Quantity';
import NpDocumentPrice from '@/components/UI/NpDocumentPrice';
import DlDocumentPrice from '@/components/UI/DlDocumentPrice';

interface Props {
	offer_id?: number
	quantity: number
	price: number
	setQuantity: Dispatch<SetStateAction<number>>
}

const DeliveryCalculation: FC<Props> = ({ offer_id, quantity, price, setQuantity }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [ operator, setOperator ] = useState<string>('nova-poshta');
	const { city } = useAppSelector(state => state.orderReducer);
	const [ showDescription, setShowDescription ] = useState<boolean>(false);
	const t = useTranslations('Delivery calculation');

	const onSetQuantity = (_: number, quan: number) => {
		setQuantity(quan);
	}

	const handleClick = () => {
		setShowDescription(true);
	}

	const onChange = (e: { target: HTMLInputElement }) => {
		const value = e.target.value;
		const onlyNumbers = value.replace(/\D/g, '');
		const numericValue = Number(onlyNumbers);

		setQuantity(numericValue < 99 ? numericValue : 99);
	}

	const onReset = () => {
		setShowDescription(false);
	}

	const handleClickOpen = (id: string) => {
		onOpen();
		setOperator(id);
	}

	return (
		<>
			<div className='delivery-calculation flex items-center gap-2 mt-6'>
				<p className='text-sm font-medium'>Розрахувати доставку</p>
				<Button
					isIconOnly={ true }
					onPress={ () => handleClickOpen('nova-poshta') }
					radius='sm'
					variant='bordered'
					aria-label={ t('delivery calculation') }
					className='bg-white hover:bg-white hover:shadow'
				>
					<Image width={ 30 } height={ 30 } src='/images/nova-poshta-logo.png' alt=""/>
				</Button>
				<Button
					isIconOnly={ true }
					onPress={ () => handleClickOpen('delivery') }
					radius='sm'
					variant='bordered'
					aria-label={ t('delivery calculation') }
					className='bg-white hover:bg-white hover:shadow'
				>
					<Image width={ 27 } height={ 30 } src='/images/delivery-logo.png' alt=""/>
				</Button>
			</div>
			<Modal isOpen={ isOpen } onOpenChange={ onOpenChange } placement='top'>
				<ModalContent>
					{ (onClose) => (
						<>
							<ModalHeader className="flex items-center gap-2">
								<Image width={ 18 } height={ 18 } src={ `/images/${operator}-logo.png` } alt=""/>
								<h3 className="text-base font-semibold leading-6 text-gray-900">
									{ t('delivery calculation') }
								</h3>
							</ModalHeader>
							<ModalBody>
								<div className="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
									<div className='mt-6 mb-4'>
										{ !showDescription && <>
											<p className='mt-4 mb-2'>
												{ t('specify city') }
											</p>
											<NpCitySearch />
											<p className='mt-4 mb-2'>
												{ t('specify quantity') }
											</p>
											<Quantity
												id={ 0 }
												quantity={ quantity }
												offerQuantity={ 99 }
												onChange={ onChange }
												setQuantity={ onSetQuantity }
											/>
										</> }
										{ showDescription && city.value.length > 0 ? operator === 'nova-poshta' ? <NpDocumentPrice offer_id={ offer_id } quantity={ quantity } price={ price } /> : <DlDocumentPrice offer_id={ offer_id } quantity={ quantity } price={ price } /> : null }
									</div>
								</div>
							</ModalBody>
							<ModalFooter>
								{ showDescription && <Button color='primary' size='lg' variant='light' className='w-max px-5' onPress={ onReset }>
									{ t('change') }
								</Button> }
								{ showDescription ? <MyButton onPress={ onClose } size='lg' className='w-max px-5'>
									{ t('close') }
								</MyButton> : <MyButton onPress={ handleClick } size='lg' className='w-max px-5'>
									{ t('calculate') }
								</MyButton> }
							</ModalFooter>
						</>
					) }
				</ModalContent>
			</Modal>
		</>
	)
};

export default DeliveryCalculation;
