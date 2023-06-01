<script setup>
    import {onMounted, onUnmounted, ref} from 'vue';
    import {useRoute} from "vue-router";
    import useAuth from "../composition/useAuth.js";
    import {sendPrivateMessage, subscribeToPrivateChat} from "../services/private-chats.js";
    const {user} = useAuth();
    
    const {message, handleSubmit} = usePrivateChatForm();
    const {messages} = usePrivateChat();
    
    function usePrivateChatForm() {
        const route = useRoute();
        const message = ref('');
    
        function handleSubmit() {
            sendPrivateMessage({
                from: user.value.id,
                to: route.params.id,
                text: message.value,
            });
            message.value = '';
        }
    
        return {
            message,
            handleSubmit,
        }
    }
    
    function usePrivateChat() {
        const messages = ref([]);
        const route = useRoute();
        let unsubscribe;
    
        onMounted(async () => {
            unsubscribe = await subscribeToPrivateChat(
                {from: user.value.id, to: route.params.id},
                newMessages => messages.value = newMessages,
            );
        });
    
        onUnmounted(() => {
            if(typeof unsubscribe !== 'function') return;
            unsubscribe();
        });
    
        return {
            messages,
        }
    }

    function useGetEmail (id) {
    }

    </script>
    
    <template>
            <section class="container py-3">
                <h1 class="mb-3">Chat privado</h1>
    
                <h2 class="visually-hidden">Mensajes enviados</h2>
    
                <div class="chat mb-3 shadow-lg  mb-5 bg-body rounded">
                    <ul>
                        <li
                            v-for="message in messages"
                        >
                            <b>
                                {{message.from}}
                            </b>: {{ message.text }}
                        </li>
                    </ul>
                </div>
    
                <h2 class="visually-hidden">Enviar mensaje</h2>
                <form
                    action="#"
                    method="post"
                    @submit.prevent="handleSubmit"
                >
                    <label for="message" class="visually-hidden">Mensaje</label>

                    <div class="d-flex shadow-lg  mb-5 bg-body rounded">
                        <textarea
                            id="message"
                            class="form-control"
                            v-model="message"
                            placeholder="Mensaje"
                        ></textarea>
                        <button type="submit" class="input-group-text"><i class="fa fa-paper-plane"></i></button>
                    </div>
                </form>
            </section>
    </template>
    
    <style>
     .chat {
        min-height: 300px;
        padding: 1rem;
        border: 0px;
        border-radius: 5px;
    }

    </style>