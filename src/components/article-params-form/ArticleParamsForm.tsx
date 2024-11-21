import { FC, useRef, useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useClose } from 'src/hooks/userClose';

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
	articleSettings: ArticleStateType;
	setArticleSettings: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm: FC<ArticleParamsFormProps> = ({
	articleSettings,
	setArticleSettings,
}) => {
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const [formSettings, setFormSettings] =
		useState<ArticleStateType>(articleSettings);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const applySettings = () => {
		setArticleSettings(formSettings);
		setIsSidebarOpen(false);
	};

	const resetSettings = () => {
		setArticleSettings(defaultArticleState);
		setIsSidebarOpen(false);
		setFormSettings(defaultArticleState);
	};

	useClose({
		isOpen: isSidebarOpen,
		onClose: () => setIsSidebarOpen(false),
		rootRef: sidebarRef,
	});

	return (
		<>
			<ArrowButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(event) => {
						event.preventDefault();
						applySettings();
					}}
					onReset={(event) => {
						event.preventDefault();
						resetSettings();
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
