<script>
    import Project from "./Project.svelte";

    let projects = [
        {
            "title": "Scholar's Quest",
            "status": "Active",
            "tags": ["0 MRR", "Indie dev"]
        },
        {
            "title": "day2day",
            "status": "Active",
            "tags": ["Open Source"]
        },
    ]

</script>

<div>Hellow proojects </div>
<h1>Projects</h1>

{#each projects as project }
<Project {...project}/>
{/each}