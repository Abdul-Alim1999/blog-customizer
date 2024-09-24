import React, { CSSProperties, FormEvent, useRef, useEffect } from 'react';

import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

import {
	OptionType,
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

type ArticleFormProps = {
	onChange: (styles: CSSProperties) => void;
};

export const ArticleParamsForm = ({ onChange }: ArticleFormProps) => {
	const [openSidebar, setOpenSidebar] = React.useState(false);
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	const [fontFamily, setFontFamily] = React.useState<OptionType | null>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = React.useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = React.useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [widthContent, setWidthContent] = React.useState<OptionType>(
		defaultArticleState.contentWidth
	);
	const [bgColor, setBgColor] = React.useState<OptionType>(
		defaultArticleState.backgroundColor
	);

	const handleAccept = (e: FormEvent) => {
		e.preventDefault();
		onChange({
			'--font-family': fontFamily?.value,
			'--font-size': fontSize.value,
			'--font-color': fontColor.value,
			'--container-width': widthContent.value,
			'--bg-color': bgColor.value,
		} as CSSProperties);
	};

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setWidthContent(defaultArticleState.contentWidth);
		setBgColor(defaultArticleState.backgroundColor);

		onChange({
			'--font-family': defaultArticleState.fontFamilyOption.value,
			'--font-size': defaultArticleState.fontSizeOption.value,
			'--font-color': defaultArticleState.fontColor.value,
			'--container-width': defaultArticleState.contentWidth.value,
			'--bg-color': defaultArticleState.backgroundColor.value,
		} as CSSProperties);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node)
		) {
			setOpenSidebar(false);
		}
	};

	useEffect(() => {
		if (openSidebar) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [openSidebar]);

	return (
		<>
			<ArrowButton
				onClickSidebar={() => setOpenSidebar(!openSidebar)}
				isOpen={openSidebar}
			/>
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: openSidebar,
				})}>
				<form className={styles.form} onSubmit={handleAccept}>
					<Text as={'h2'} weight={800} size={31} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						onChange={setFontFamily}
						selected={fontFamily}
						options={fontFamilyOptions}
						title='ШРИФТ'
					/>
					<RadioGroup
						onChange={setFontSize}
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSize}
						title={'РАЗМЕР ШРИФТА'}
					/>
					<Select
						onChange={setFontColor}
						selected={fontColor}
						options={fontColors}
						title='ЦВЕТ ШРИФТА'
					/>
					<Separator />
					<Select
						onChange={setBgColor}
						selected={bgColor}
						options={backgroundColors}
						title='ЦВЕТ ФОНА'
					/>
					<Select
						onChange={setWidthContent}
						selected={widthContent}
						options={contentWidthArr}
						title='ШИРИНА КОНТЕНТА'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
