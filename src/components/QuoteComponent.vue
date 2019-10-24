<template>
    <div>
        <h1>Quotie App</h1>

        <div class="add-quote">
            <h2>Add new Quote</h2>
            <input type="text" v-model="newQuote" placeholder="quote">
            <input type="text" v-model="newAuthor" placeholder="author">
            <button type="submit" v-on:click="submitNewQuote(newQuote, newAuthor)">Submit</button>
            <div v-if="addError !== null" class="warning">Error while adding quote: {{addError}}</div>
        </div>


        <div class="quotes-list">
            <h2>Quotes</h2>
            <template v-if="quotes.length">
                <template v-for="quote in quotes">
                    <div v-if="quote.quote && quote.author" v-bind:key="quote.id" class="quote-container">
                        <div class="text">"{{quote.quote}}"</div>
                        <div class="author">by {{quote.author}}</div>
                    </div>
                </template>
            </template>
            <div v-if="!isLoading && quotes.length === 0">
                No quotes present
            </div>
            <div v-if="isLoading">
                Loading
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'QuoteComponent',
        data: function () {
            return {
                newQuote: null,
                newAuthor: null,
                quotes: [],
                addError: null,
                getError: null,
                isLoading: true
            }
        },
        created: function () {
            this.fetchQuotes();
        },
        methods: {
            submitNewQuote: function (quote, author) {
                this.addError = null;
                fetch('/quotes/create'
                    + `?quote=${encodeURIComponent(quote)}`
                    + `&author=${encodeURIComponent(author)}`
                )
                    .then(res => {
                        if (res.error) {
                            this.error = res.error;
                        } else {
                            this.newQuote = null;
                            this.newAuthor = null;
                            this.fetchQuotes();
                        }
                    });
            },
            fetchQuotes() {
                this.getError = null;
                this.isLoading = true;
                fetch('/quotes')
                    .then(response => response.json())
                    .then(response => {
                        if (response.error) {
                            this.getError = response.error
                        } else {
                            /*eslint no-unused-vars: "off" */
                            this.quotes = Object.keys(response).map(function (key, index) {
                                return {
                                    id: key,
                                    quote: response[key].quote,
                                    author: response[key].author
                                }
                            });
                        }
                        this.isLoading = false;
                    })
            }
        }
    }
</script>

<style scoped>
    div {
        width: 20vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .quote-container {
        margin: 10px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #2c3e50;
    }

    .text {
        font-style: italic;
    }

    .author {
        font-weight: bold;
    }
</style>
