<script>
  import "../app.postcss";

  export const load = async ({ fetch }) => {
    // fetch's result will be cached for the client
    const seed = await fetch('../random-seeds')
      .then(res => res.json())
      .then(json => json.seed)
      .catch(() => '') // this shouldn't break the app

    return {
      props: {
        seed,
      },
    }
  }

</script>
<div>

  <slot/>
</div>

