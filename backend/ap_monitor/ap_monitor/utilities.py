import yaml

def update_prometheus_targets(ip_addresses):
    filename = 'prometheus.yml'

    with open(filename, 'r') as file:
        data = yaml.safe_load(file)

    # Find the 'blackbox' job, append new IPs to its targets while avoiding duplicates
    for job in data.get('scrape_configs', []):
        if job['job_name'] == 'blackbox':
            current_targets = set(job['static_configs'][0]['targets'])
            updated_targets = current_targets.union(ip_addresses)
            job['static_configs'][0]['targets'] = list(updated_targets)
            break

    with open(filename, 'w') as file:
        yaml.dump(data, file, sort_keys=False)
