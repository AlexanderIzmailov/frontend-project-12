export default {
    translation: {
        loginForm: {
            title: 'Войти',
            userName: 'Ваш ник',
            password: 'Пароль',
            submit: 'Войти',
            logout: 'Выйти',
            invitationToRegister: 'Нет аккаунта?',
            registerLink: 'Регистрация',
            errors: {
                invalidAuth: 'Неверные имя пользователя или пароль',
                requiredField: 'Обязательное поле',
            }
        },
        signupForm: {
            title: 'Регистрация',
            userName: 'Имя пользователя',
            password: 'Пароль',
            passwordConfirm: 'Подтвердите пароль',
            submit: 'Зарегистрироваться',
            errors: {
                requiredField: 'Обязательное поле',
                userNameLength: 'От 3 до 20 символов',
                passwordLength: 'Не менее 6 символов',
                passwordConfirm: 'Пароли должны совпадать',
                userExist: 'Такой пользователь уже существует',
            }
        },
        chat: {
            send: 'Отправить',
            channelsTitle: 'Каналы',
            inputField: 'Введите сообщение...',
            removeChannel: 'Удалить',
            renameChannel: 'Переименовать',
            toasts: {
                addChannel: 'Канал создан',
                removeChannel: 'Канал удалён',
                renameChannel: 'Канал переименован',
            },
            numberMessages: {
                number_one: '{{count}} сообщение',
                number_few: '{{count}} сообщения',
                number_many: '{{count}} сообщений',
            },
            inputLabel: 'Новое сообщение',
        },
        modals: {
            addChannel: 'Добавить канал',
            renameChannel: 'Переименовать канал',
            removeChannel: 'Удалить канал',
            removeChannelConfirm: 'Уверены?',
            sendBtn: 'Отправить',
            cancelBtn: 'Отменить',
            removeBtn: 'Удалить',
            errors: {
                channelExist: 'Должно быть уникальным',
                length: 'От 3 до 20 символов',
                requiredField: 'Обязательное поле',
            },
            addChannelLabel: 'Имя канала',
        },
        errors: {
            socket: 'Проблема с сокетом',
            connection: 'Проблема с соединением',
        },
    },
  };
