import { FC, useEffect, useRef, useState } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	isOpen: boolean;
	articleSettings: ArticleStateType;
	toggleSidebar: () => void;
	applySettings: (newSettings: ArticleStateType) => void;
	resetSettings: () => void;
}

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	isOpen,
	articleSettings,
	toggleSidebar,
	applySettings,
	resetSettings,
}) => {
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(articleSettings);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				toggleSidebar();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, toggleSidebar]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isOpen ? styles.container_open : ''
				}`}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault();
						applySettings(formSettings);
					}}
					onReset={(event) => {
						event.preventDefault();
						resetSettings();
						setFormSettings(defaultArticleState);
					}}>
					<Text uppercase={true} weight={800} size={31} as={'h2'}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={formSettings.fontFamilyOption}
						onChange={(option) =>
							setFormSettings({ ...formSettings, fontFamilyOption: option })
						}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={formSettings.fontSizeOption}
						onChange={(option) =>
							setFormSettings({ ...formSettings, fontSizeOption: option })
						}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={formSettings.fontColor}
						onChange={(option) =>
							setFormSettings({ ...formSettings, fontColor: option })
						}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formSettings.backgroundColor}
						onChange={(option) =>
							setFormSettings({ ...formSettings, backgroundColor: option })
						}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={formSettings.contentWidth}
						onChange={(option) =>
							setFormSettings({ ...formSettings, contentWidth: option })
						}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
